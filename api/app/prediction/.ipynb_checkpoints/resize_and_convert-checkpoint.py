from PIL import Image
import os

def resize_and_convert_images(directory, target_size=(224, 224)):
    for foldername in os.listdir(directory):
        folder_path = os.path.join(directory, foldername)
        if os.path.isdir(folder_path):
            for filename in os.listdir(folder_path):
                file_path = os.path.join(folder_path, filename)
                if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
                    try:
                        with Image.open(file_path) as img:
                            # Convert to RGB
                            img = img.convert('RGB')
                            # Resize image
                            img = img.resize(target_size)
                            # Save the image
                            img.save(file_path)
                            print(f"Processed {file_path}")
                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")

# Set the path to your Split_Data directory
split_data_dir = './Split_Data/'

resize_and_convert_images(split_data_dir)
