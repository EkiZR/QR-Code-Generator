let btn = document.querySelector(".qr-button");
let qr_code_element = document.querySelector(".qr-code");
let downloadLink = document.getElementById("downloadLink");

btn.addEventListener("click", () => {
  let user_input = document.querySelector("#input_text");
  if (user_input.value !== "") {
    if (qr_code_element.childElementCount === 0) {
      generate(user_input);
    } else {
      qr_code_element.innerHTML = "";
      generate(user_input);
    }
  } else {
    console.log("Input tidak valid");
    qr_code_element.style.display = "none";
    downloadLink.style.display = "none"; 
  }
});

function generate(user_input) {
    qr_code_element.style.display = "";
    qr_code_element.style.marginTop = "20px"; 
    qr_code_element.style.marginBottom = "20px"; 
  
    var qrcode = new QRCode(qr_code_element, {
      text: `${user_input.value}`,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff", 
      correctLevel: QRCode.CorrectLevel.H,
    });
  
    let qr_code_img = document.querySelector(".qr-code img");
    let qr_code_canvas = document.querySelector("canvas");
  
    if (qr_code_img.getAttribute("src") == null) {
      setTimeout(() => {
        downloadLink.style.display = "block"; 
        downloadLink.href = addWhiteBackground(qr_code_canvas.toDataURL()); 
      }, 300);
    } else {
      setTimeout(() => {
        downloadLink.style.display = "block"; 
        downloadLink.href = addWhiteBackground(qr_code_img.getAttribute("src")); 
      }, 300);
    }
  }
  
  function addWhiteBackground(dataURL) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = 200; 
    canvas.height = 200;
  
    // Gambar latar belakang putih
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Gambar QR Code di tengah
    const qrCodeImg = new Image();
    qrCodeImg.src = dataURL;
    ctx.drawImage(qrCodeImg, 10, 10, 180, 180); 
  
    return canvas.toDataURL();
  }
  