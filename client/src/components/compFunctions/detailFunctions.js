const deleteBreed = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/dogs/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        window.location.href = "/home";
        return data;
      } catch (error) {
        console.error(error);
      }
}

export {deleteBreed}