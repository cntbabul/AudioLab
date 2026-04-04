import modal

# Create a Modal App
app = modal.App("audio-lab-get-started")

# Define a function to run on Modal's infrastructure
@app.function()
def square(i):
    print(f"Server-side: calculating square of {i}")
    return i * i

# Define a local entrypoint to run from your machine
@app.local_entrypoint()
def main():
    # Call the remote function
    result = square.remote(42)
    print(f"The square of 42 is {result}")
