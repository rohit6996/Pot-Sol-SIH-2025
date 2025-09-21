import requests
import psycopg2
import time
import html
import re

# --------- 1. Twitter API setup ----------
BEARER_TOKEN = "Your_Bearer_Token_Here"
HASHTAG = "#PotSol"

SEARCH_URL = f"https://api.twitter.com/2/tweets/search/recent?query=%23PotSol&tweet.fields=created_at,author_id,text,public_metrics&expansions=attachments.media_keys&media.fields=url,type"

HEADERS = {"Authorization": f"Bearer {BEARER_TOKEN}"}

# --------- 2. Connect to PostgreSQL ----------
conn = psycopg2.connect(
    host="localhost",
    database="tweets",
    user="postgres",
    password="admin123"
)
cursor = conn.cursor()

# --------- 3. Create table if not exists ----------
cursor.execute("""
CREATE TABLE IF NOT EXISTS tweets (
    tweet_id TEXT PRIMARY KEY,
    author_id TEXT,
    text TEXT,
    created_at TIMESTAMP,
    has_media BOOLEAN,
    media_urls TEXT,
    retweet_count INTEGER,
    like_count INTEGER,
    email TEXT
)
""")
conn.commit()

# --------- 4. Regex for email extraction ----------
EMAIL_REGEX = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}"

# --------- 5. Fetch tweets and save ----------
def fetch_and_save():
    response = requests.get(SEARCH_URL, headers=HEADERS)
    if response.status_code == 429:
        print("Rate limit reached. Waiting 15 minutes...")
        time.sleep(900)
        return
    elif response.status_code != 200:
        print("Error:", response.status_code, response.text)
        return

    data = response.json()
    tweets = data.get("data", [])
    media_dict = {m['media_key']: m for m in data.get("includes", {}).get("media", [])}

    for t in tweets:
        tweet_id = t.get("id")
        author_id = t.get("author_id")
        text = html.unescape(t.get("text", ""))
        created_at = t.get("created_at")
        retweet_count = t.get("public_metrics", {}).get("retweet_count", 0)
        like_count = t.get("public_metrics", {}).get("like_count", 0)

        # Handle media
        media_urls = []
        if "attachments" in t and "media_keys" in t["attachments"]:
            for key in t["attachments"]["media_keys"]:
                media_urls.append(media_dict.get(key, {}).get("url", ""))

        has_media = bool(media_urls)
        media_urls_str = ",".join(media_urls)

        # Extract email from text
        emails = re.findall(EMAIL_REGEX, text)
        email = emails[0] if emails else None

        # Insert into DB (ignore duplicates)
        cursor.execute("""
            INSERT INTO tweets (tweet_id, author_id, text, created_at, has_media, media_urls, retweet_count, like_count, email)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (tweet_id) DO NOTHING
        """, (tweet_id, author_id, text, created_at, has_media, media_urls_str, retweet_count, like_count, email))
        conn.commit()
        print("Saved tweet:", tweet_id, "| Email:", email)

# --------- 6. Loop to run every 5 minutes ----------
while True:
    fetch_and_save()
    print("Waiting 5 minutes for next check...")
    time.sleep(300)
