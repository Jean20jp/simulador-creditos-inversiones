const toggleModalAddEntity = () => {
  const bodyClassList = document.body.classList;

  if (bodyClassList.contains("open")) {
    bodyClassList.remove("open");
    bodyClassList.add("closed");
  } else {
    bodyClassList.remove("closed");
    bodyClassList.add("open");
  }
};

const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];

const inputFiles = document.querySelectorAll(
  ".dropzone-area input[type='file']"
);

const inputElement = inputFiles[0];

const dropZoneElement = inputElement.closest(".dropzone-area");

inputElement.addEventListener("change", (e) => {
  if (inputElement.files.length) {
    updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
  }
});

dropZoneElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("dropzone--over");
  });
});

dropZoneElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;

    updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
  }

  dropZoneElement.classList.remove("dropzone--over");
});

const updateDropzoneFileList = (dropzoneElement, file) => {
  let dropzoneFileMessage = dropzoneElement.querySelector(".message");

  dropzoneFileMessage.innerHTML = `
        ${file.name}, ${file.size} bytes
    `;
};

/* dropzoneBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFiled = document.getElementById("upload-file");
  console.log(myFiled.files[0]);
}); */


function logOut() {
  localStorage.removeItem('token');
  window.location.href = "index.html";
}

function hrefLogIn() {
  window.location.href = "views/login.html";
}

function hrefAddUser() {
  window.location.href = "views/register_user.html";
}

function hrefGtnEntities() {
  window.location.href = "views/gtn_entities.html"
}

async function registerEntity() {

  const token = localStorage.getItem('token');

  const entityData = {
    name: document.getElementById('nameEntity').value,
    phone: document.getElementById('telefEntity').value,
    address: document.getElementById('addressEntity').value
  };

  try {

    const response = await fetch('http://localhost/simuladorCredInver-apirest/api-rest/registerFinancialEntity', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Incluir el token en los encabezados
      },
      body: JSON.stringify(entityData) // Convertir el objeto a JSON
    });
    const data = await response.json();
    if (data.status == 'OK') {
      window.location.href = "index.html";
      cleanFormRegisterEntity();
  } else {
      // Hubo un problema con la solicitud
      alert('Hubo un problema al registrar la entidad. Por favor, intenta nuevamente.');
  }
    
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
}

function cleanFormRegisterEntity() {
  document.getElementById('nameEntity').value = "";
  document.getElementById('telefEntity').value = "";
  document.getElementById('addressEntity').value = "";
}

document.addEventListener("DOMContentLoaded", function() {

  async function getEntityFinancial() {
    try {
      const response = await fetch('http://localhost/simuladorCredInver-apirest/api-rest/getFinancialEntity');
      const data = await response.json();
  
      if (data.status = 'OK') {
        let isAdmin = localStorage.getItem('token') ? true : false;
        createCard(data.entities);
        toggleEditButtonVisibility(isAdmin);
      }
  
    } catch (error) {
        console.error('Error del servidor:', error);
    }
  }

    
  function toggleEditButtonVisibility(isLoggedIn) {
    if (isLoggedIn) {
      document.getElementById("btnIniciarSesion").style.display = "none"; 
      document.getElementById("btnCerrarSesion").style.display = "inline-block"; 
      document.getElementById("btnAddEntity").style.display = "inline-block";
      document.getElementById("btnGtnEntities").style.display = "inline-block";
      document.getElementById("btnAddUser").style.display = "inline-block";
    } else {
      document.getElementById("btnIniciarSesion").style.display = "inline-block";
      document.getElementById("btnCerrarSesion").style.display = "none";
      document.getElementById("btnAddEntity").style.display = "none";
      document.getElementById("btnGtnEntities").style.display = "none";
      document.getElementById("btnAddUser").style.display = "none";
    }
  }

  getEntityFinancial();
  
  function createCard(entities) {

    const container = document.querySelector('.container');

    entities.forEach(entity => {
      const card = document.createElement('article');
      card.classList.add('card_entity');

      const background = document.createElement('div');
      background.classList.add('background');
      background.style.display = 'flex';
      background.style.justifyContent = 'center';
      background.style.alignItems = 'center';

      const img = document.createElement('img');
      img.src = '../src/assets/bank.svg'; // Asignar la imagen en base64 al atributo src
      img.alt = 'profile';
      img.style.maxWidth = '160px';
      img.style.maxHeight = '160px';
      background.appendChild(img);

      const content = document.createElement('div');
      content.classList.add('content');
      content.innerHTML = `
        <h2>${entity.name}</h2>
        <p>${entity.phone}</p>
        <p>${entity.address}</p>
        <a href="views/entity_view.html?id=${entity.id}" class="btn mt-4">Simuladores</a>
      `;

      card.appendChild(background);
      card.appendChild(content);
      container.appendChild(card);
    });
  }  
});

