import json
import base64
import zlib
import customtkinter as ctk
from tkinter import filedialog
from tkinter import messagebox

# Function to convert Tiled JSON to Game Format
def convert_tiled_to_game(input_file, output_file):
    try:
        with open(input_file, 'r') as infile:
            tiled_data = json.load(infile)

        game_data = {
            "height": tiled_data["height"],
            "width": tiled_data["width"],
            "tileheight": tiled_data["tileheight"],
            "tilewidth": tiled_data["tilewidth"],
            "orientation": tiled_data["orientation"],
            "properties": {},  # Optional level properties can be added here
            "tilesets": tiled_data["tilesets"],
            "layers": []
        }

        for layer in tiled_data["layers"]:
            if layer["type"] == "tilelayer":
                # Decompress and decode tile data
                if "data" in layer and layer["encoding"] == "base64":
                    compressed_data = base64.b64decode(layer["data"])
                    decompressed_data = zlib.decompress(compressed_data)
                    tile_data = list(decompressed_data)

                    game_layer = {
                        "name": layer["name"],
                        "type": "tilelayer",
                        "width": layer["width"],
                        "height": layer["height"],
                        "opacity": layer["opacity"],
                        "visible": layer["visible"],
                        "data": tile_data
                    }
                    game_data["layers"].append(game_layer)

            elif layer["type"] == "objectgroup":
                # Convert objects and their properties
                game_objects = []
                for obj in layer["objects"]:
                    game_object = {
                        "name": obj["name"],
                        "type": obj["type"],
                        "x": obj["x"],
                        "y": obj["y"],
                        "width": obj["width"],
                        "height": obj["height"],
                        "visible": obj["visible"],
                        "properties": {}
                    }

                    # Convert properties list to key-value pairs
                    if "properties" in obj:
                        for prop in obj["properties"]:
                            game_object["properties"][prop["name"]] = prop["value"]

                    game_objects.append(game_object)

                game_layer = {
                    "name": layer["name"],
                    "type": "objectgroup",
                    "objects": game_objects
                }
                game_data["layers"].append(game_layer)

        # Save the converted data to the output file
        with open(output_file, 'w') as outfile:
            json.dump(game_data, outfile, indent=4)

    except Exception as e:
        raise Exception(f"An error occurred during conversion: {str(e)}")

# Tkinter GUI for file selection and conversion
class TiledConverterApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Tiled to Game Converter")
        self.geometry("400x200")

        self.input_file = None
        self.output_file = None

        # Input file selection
        self.input_button = ctk.CTkButton(self, text="Select Input File", command=self.select_input_file)
        self.input_button.pack(pady=10)

        # Output file selection
        self.output_button = ctk.CTkButton(self, text="Select Output File", command=self.select_output_file)
        self.output_button.pack(pady=10)

        # Convert button
        self.convert_button = ctk.CTkButton(self, text="Convert", command=self.convert)
        self.convert_button.pack(pady=20)

    def select_input_file(self):
        self.input_file = filedialog.askopenfilename(filetypes=[("JSON Files", "*.json")])
        if self.input_file:
            print(f"Selected input file: {self.input_file}")

    def select_output_file(self):
        self.output_file = filedialog.asksaveasfilename(defaultextension=".json", filetypes=[("JSON Files", "*.json")])
        if self.output_file:
            print(f"Selected output file: {self.output_file}")

    def convert(self):
        if not self.input_file or not self.output_file:
            messagebox.showerror("Error", "Please select both an input and output file.")
            return

        try:
            convert_tiled_to_game(self.input_file, self.output_file)
            messagebox.showinfo("Success", f"Conversion successful! Saved to {self.output_file}")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

# Running the GUI Application
if __name__ == "__main__":
    app = TiledConverterApp()
    app.mainloop()
