import { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

function LinkContainer() {
  const [favLinks, setFavLinks] = useState([]);
  const [detectChange, setDetectChange] = useState(false);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/links", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setFavLinks(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
        console.log("There has been a error getting the links");
      }
    };

    getLinks();
  }, [detectChange]);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/links/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // setFavLinks(favLinks.filter((link) => link.id !== id));
      // setDetectChange(!detectChange);
    } catch (error) {
      console.error("Error deleting favLink:", error);
    }
  };
  

  const handleSubmit = async (favLink) => {
    try {
      const response = await fetch("http://localhost:3000/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favLink),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(response);
      setDetectChange(!detectChange);
    } catch (error) {
      console.error("Error:", error);
      console.log("There has been a error creating a link");
    }
  };

  return (
    <div>
      <h1>My Favorite Links</h1>
      <p>Add a new link with a name and URL to the table! </p>
      <Table linkData={favLinks} removeLink={handleRemove} />
      <h1>Add New</h1>
      <Form addLink={handleSubmit} />
    </div>
  );
}
export default LinkContainer;
