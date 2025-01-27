import cv2
import numpy as np

class OpenCVImageValidator:
    @staticmethod
    def validate_medical_image(image_path):
        """
        Validate image using OpenCV-based checks
        
        Args:
            image_path (str): Path to the image file
        
        Returns:
            dict: Validation results with details
        """
        try:
            # Read the image
            image = cv2.imread(image_path, cv2.IMREAD_COLOR)
            
            if image is None:
                return {
                    'is_valid': False, 
                    'reason': 'Unable to read image file'
                }
            
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Validation checks
            validation_results = {
                'spatial_properties': OpenCVImageValidator._check_spatial_properties(image),
                'color_properties': OpenCVImageValidator._check_color_properties(image),
                'texture_properties': OpenCVImageValidator._check_texture_properties(gray)
            }
            
            # Combine results
            is_valid = (
                validation_results['spatial_properties']['is_valid'] and
                validation_results['color_properties']['is_valid'] and
                validation_results['texture_properties']['is_valid']
            )
            
            return {
                'is_valid': is_valid,
                'details': validation_results,
                'reason': 'Image does not match expected medical image characteristics' if not is_valid else 'Valid medical image'
            }
        
        except Exception as e:
            return {
                'is_valid': False, 
                'reason': f'Validation error: {str(e)}'
            }
    
    @staticmethod
    def _check_spatial_properties(image):
        """
        Check spatial characteristics of the image
        
        Args:
            image (numpy.ndarray): Input image
        
        Returns:
            dict: Spatial property validation results
        """
        # Check image dimensions
        height, width = image.shape[:2]
        
        # Typical MRI image aspect ratios and sizes
        is_valid_size = (
            100 < width < 2000 and  # Reasonable width range
            100 < height < 2000 and  # Reasonable height range
            0.5 < width/height < 2  # Aspect ratio check
        )
        
        return {
            'is_valid': is_valid_size,
            'width': width,
            'height': height,
            'aspect_ratio': width/height
        }
    
    @staticmethod
    def _check_color_properties(image):
        """
        Analyze color distribution and characteristics
        
        Args:
            image (numpy.ndarray): Input image
        
        Returns:
            dict: Color property validation results
        """
        # Convert to HSV for better color analysis
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Calculate color saturation
        _, saturation, _ = cv2.split(hsv)
        
        # Check color characteristics typical of medical images
        avg_saturation = np.mean(saturation)
        std_saturation = np.std(saturation)
        
        is_valid_color = (
            avg_saturation < 30 and  # Low saturation (medical images often look washed out)
            std_saturation < 20  # Low color variation
        )
        
        return {
            'is_valid': is_valid_color,
            'avg_saturation': avg_saturation,
            'std_saturation': std_saturation
        }
    
    @staticmethod
    def _check_texture_properties(gray_image):
        """
        Analyze texture and intensity characteristics
        
        Args:
            gray_image (numpy.ndarray): Grayscale image
        
        Returns:
            dict: Texture property validation results
        """
        # Calculate image statistics
        mean_intensity = np.mean(gray_image)
        std_intensity = np.std(gray_image)
        
        # Compute image entropy (measure of texture complexity)
        histogram = cv2.calcHist([gray_image], [0], None, [256], [0, 256])
        histogram = histogram / histogram.sum()
        entropy = -np.sum(histogram * np.log2(histogram + 1e-7))
        
        # Typical MRI image characteristics
        is_valid_texture = (
            20 < mean_intensity < 200 and  # Reasonable intensity range
            10 < std_intensity < 80 and  # Texture variation
            3 < entropy < 7  # Entropy range typical of medical images
        )
        
        return {
            'is_valid': is_valid_texture,
            'mean_intensity': mean_intensity,
            'std_intensity': std_intensity,
            'entropy': entropy
        }
    
    @staticmethod
    def visualize_analysis(image_path, output_path=None):
        """
        Generate a visualization of image analysis
        
        Args:
            image_path (str): Path to input image
            output_path (str, optional): Path to save analysis visualization
        
        Returns:
            numpy.ndarray: Visualization image
        """
        # Read the image
        image = cv2.imread(image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Perform analysis
        validation_result = OpenCVImageValidator.validate_medical_image(image_path)
        
        # Create visualization
        analysis_img = np.zeros((400, 600, 3), dtype=np.uint8) + 255
        
        # Add analysis details
        cv2.putText(analysis_img, "Image Analysis", (20, 50), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2)
        
        # Display validation results
        results = [
            f"Overall Valid: {validation_result['is_valid']}",
            f"Size Valid: {validation_result['details']['spatial_properties']['is_valid']}",
            f"Color Valid: {validation_result['details']['color_properties']['is_valid']}",
            f"Texture Valid: {validation_result['details']['texture_properties']['is_valid']}"
        ]
        
        for i, result in enumerate(results):
            cv2.putText(analysis_img, result, (20, 100 + i*50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,0), 2)
        
        # Optional: Save visualization
        if output_path:
            cv2.imwrite(output_path, analysis_img)
        
        return analysis_img
    
    
class OpenCVImageValidatorRefined:
    @staticmethod
    def validate_medical_image(image_path):
        """
        Validate image using refined OpenCV-based checks
        
        Args:
            image_path (str): Path to the image file
        
        Returns:
            dict: Validation results with details
        """
        try:
            # Read the image
            image = cv2.imread(image_path, cv2.IMREAD_COLOR)
            
            if image is None:
                return {
                    'is_valid': False, 
                    'reason': 'Unable to read image file'
                }
            
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Validation checks
            validation_results = {
                'spatial_properties': OpenCVImageValidatorRefined._check_spatial_properties(image),
                'color_properties': OpenCVImageValidatorRefined._check_color_properties(image),
                'texture_properties': OpenCVImageValidatorRefined._check_texture_properties(gray)
            }
            
            # Combine results
            is_valid = (
                validation_results['spatial_properties']['is_valid'] and
                validation_results['color_properties']['is_valid'] and
                validation_results['texture_properties']['is_valid']
            )
            
            return {
                'is_valid': is_valid,
                'details': validation_results,
                'reason': 'Image does not match expected medical image characteristics' if not is_valid else 'Valid medical image'
            }
        
        except Exception as e:
            return {
                'is_valid': False, 
                'reason': f'Validation error: {str(e)}'
            }
    
    @staticmethod
    def _check_spatial_properties(image):
        """
        Check spatial characteristics of the image
        
        Args:
            image (numpy.ndarray): Input image
        
        Returns:
            dict: Spatial property validation results
        """
        # Check image dimensions
        height, width = image.shape[:2]
        
        # Typical MRI image aspect ratios and sizes
        is_valid_size = (
            100 < width < 2000 and  # Reasonable width range
            100 < height < 2000 and  # Reasonable height range
            0.5 < width / height < 2  # Aspect ratio check
        )
        
        return {
            'is_valid': is_valid_size,
            'width': width,
            'height': height,
            'aspect_ratio': width / height
        }
    
    @staticmethod
    def _check_color_properties(image):
        """
        Analyze color distribution and characteristics
        
        Args:
            image (numpy.ndarray): Input image
        
        Returns:
            dict: Color property validation results
        """
        # Convert to HSV for better color analysis
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Calculate color saturation
        _, saturation, _ = cv2.split(hsv)
        
        # Check color characteristics typical of medical images
        avg_saturation = np.mean(saturation)
        std_saturation = np.std(saturation)
        
        is_valid_color = (
            avg_saturation < 50 and  # Slightly higher allowance for saturation
            std_saturation < 30  # Allowable standard deviation
        )
        
        return {
            'is_valid': is_valid_color,
            'avg_saturation': avg_saturation,
            'std_saturation': std_saturation
        }
    
    @staticmethod
    def _check_texture_properties(gray_image):
        """
        Analyze texture and intensity characteristics
        
        Args:
            gray_image (numpy.ndarray): Grayscale image
        
        Returns:
            dict: Texture property validation results
        """
        # Calculate image statistics
        mean_intensity = np.mean(gray_image)
        std_intensity = np.std(gray_image)
        
        # Compute image entropy (measure of texture complexity)
        histogram = cv2.calcHist([gray_image], [0], None, [256], [0, 256])
        histogram = histogram / histogram.sum()
        entropy = -np.sum(histogram * np.log2(histogram + 1e-7))
        
        # Updated MRI image characteristics
        is_valid_texture = (
            10 < mean_intensity < 220 and  # Relaxed intensity range
            5 < std_intensity < 100 and  # Expanded texture variation
            2.5 < entropy < 7.5  # Wider entropy range
        )
        
        return {
            'is_valid': is_valid_texture,
            'mean_intensity': mean_intensity,
            'std_intensity': std_intensity,
            'entropy': entropy
        }