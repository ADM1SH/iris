import os

file_path = "/Users/adamanwar/Desktop/iris/background.txt"
target_width = 125
target_height = 42

with open(file_path, 'r') as f:
    lines = f.readlines()

processed_lines = []
for line in lines:
    line = line.rstrip('\n') # Remove trailing newline
    if len(line) > target_width:
        processed_lines.append(line[:target_width])
    else:
        processed_lines.append(line.ljust(target_width))

# Adjust height
if len(processed_lines) > target_height:
    processed_lines = processed_lines[:target_height]
else:
    while len(processed_lines) < target_height:
        processed_lines.append(' ' * target_width)

with open(file_path, 'w') as f:
    f.write('\n'.join(processed_lines))

print("Background.txt resized successfully.")