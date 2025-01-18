import tkinter as tk
from pyvirtualdisplay import Display
from PIL import ImageGrab

# Start virtual display
display = Display(visible=0, size=(800, 600))
display.start()

# Create the main window
root = tk.Tk()
root.title("Tkinter Test")

# Create a label widget
label = tk.Label(root, text="Hello, Tkinter!")
label.pack(pady=20)

# Create a button widget
button = tk.Button(root, text="Click Me", command=lambda: label.config(text="Button Clicked!"))
button.pack(pady=10)

# Set window size and update
root.geometry("800x600")
root.update_idletasks()

# Capture the window as an image using ImageGrab
bbox = (root.winfo_rootx(), root.winfo_rooty(), root.winfo_rootx() + 800, root.winfo_rooty() + 600)
img = ImageGrab.grab(bbox)
img.save("tkinter_output.png")

root.destroy()
display.stop()

print("GUI saved as tkinter_output.png")
