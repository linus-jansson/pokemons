import csv
import json

output = []
# Open the CSV
with open("pokemons.csv", "r") as f:
    reader = csv.DictReader(f)
    # Loop through each row
    for row in reader:
        output.append({
            "id": row["id"],
            "pokemon": row["identifier"],
        })

with open("pokemons.json", "w") as f:
    # Write the JSON
    json.dump(output, f)
    