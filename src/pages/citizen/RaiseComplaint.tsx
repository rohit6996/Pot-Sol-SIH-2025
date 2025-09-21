import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Upload, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "medium",
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

  const { toast } = useToast();

  // Load Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "Your_Google_Maps_API_Key", // replace with your API key
    libraries: ["places"],
  });

  // Handle input change
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedImages([...uploadedImages, ...Array.from(e.target.files)]);
    }
  };

  // Handle map click
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });
      setFormData((prev) => ({ ...prev, location: `${lat}, ${lng}` }));
    }
  };

  // Use device GPS
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMarker({ lat, lng });
        setFormData((prev) => ({ ...prev, location: `${lat}, ${lng}` }));
        toast({
          title: "Location Set",
          description: "Your current location has been added",
        });
      },
      () => {
        toast({
          title: "Error",
          description: "Unable to retrieve your location",
          variant: "destructive",
        });
      }
    );
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: send formData + uploadedImages to backend
      console.log("Complaint submitted:", formData, uploadedImages);

      toast({
        title: "Success",
        description: "Your complaint has been submitted successfully",
      });

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "medium",
      });
      setUploadedImages([]);
      setMarker(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Report a Civic Issue
          </CardTitle>
          <CardDescription>
            Help improve your community by reporting issues that need attention
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Short title of the issue"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="road">Road Damage</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="streetlight">Streetlight</SelectItem>
                  <SelectItem value="water">Water Supply</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location + Map + Use My Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Street address or coordinates"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleUseMyLocation}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Use My Location
                </Button>
              </div>

              <div className="h-64 w-full border rounded-lg overflow-hidden">
                {isLoaded ? (
                  <GoogleMap
                    zoom={14}
                    center={marker || { lat: 19.076, lng: 72.8777 }} // Default: Mumbai
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    onClick={handleMapClick}
                  >
                    {marker && <Marker position={marker} />}
                  </GoogleMap>
                ) : (
                  <p>Loading map...</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the issue..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            {/* Upload Photos */}
            <div className="space-y-2">
              <Label htmlFor="photos">Photos (optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("photos")?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photos
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaiseComplaint;
