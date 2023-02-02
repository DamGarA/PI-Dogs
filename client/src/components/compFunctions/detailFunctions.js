const redirect = () => {
  window.location.href = "/home";
};

const deleteBreed = async (id, setShowDelete) => {
    try {
      //manda el fetch para que se borre
         await fetch(`http://localhost:3001/dogs/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        //setea el texto para el usuario
        setShowDelete(true)
        //En 3 seg. se redirige al home
        setTimeout(redirect, 3000)
      } catch (error) {
        setShowDelete("Error!")
      }
}

export {deleteBreed}