import tkinter as tk

# Create the main window
root = tk.Tk()
root.title("Tkinter Test")

# Create a label widget
label = tk.Label(root, text="Hello, Tkinter!")
label.pack(pady=20)

# Create a button widget
button = tk.Button(root, text="Click Me", command=lambda: label.config(text="Button Clicked!"))
button.pack(pady=10)

# Run the application
root.mainloop()
