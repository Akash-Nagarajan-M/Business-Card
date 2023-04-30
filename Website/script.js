function generateCard(event) {
    event.preventDefault();
  
    const fname = document.getElementById("fname-input").value;
    const lname = document.getElementById("lname-input").value;
    const profession = document.getElementById("profession-input").value;
    const email = document.getElementById("email-input").value;
    const website = document.getElementById("website-input").value;
    const phone = document.getElementById("phone-input").value;
    const image = document.getElementById("image-input").files[0];
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageObj = new Image();
      imageObj.onload = function () {
        const canvas = document.createElement("canvas");
  
        canvas.width = 948;
        canvas.height = 550;
        var end_pt = canvas.width - 100,e_ic=end_pt+50;
  
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.drawImage(imageObj, 100, 200,200,200);
        ctx.textAlign = "end"; 
        ctx.font = "bold 50px Arial";
        ctx.fillText(fname.toUpperCase(),e_ic, 80);
        ctx.font = "50px Arial";
        ctx.fillText(lname.toUpperCase(),e_ic, 150);
        ctx.font = "bold 32px Arial";
        ctx.fillText(profession, e_ic, 230);
        ctx.font = "30px Arial";
        ctx.fillText(phone, end_pt, 290);
        ctx.fillText(email, end_pt, 350);
        ctx.fillText(website, end_pt, 410);
  
        ctx.fillStyle = "#00cc00";
        ctx.strokeStyle = "#00cc00";
        ctx.font='30px FontAwesome';
        ctx.fillText('\uf095 ',e_ic,290);
        ctx.fillText('\uf0e0 ',e_ic,350);
        ctx.fillText('\uf0ac ',e_ic,410);
  
        ctx.beginPath();
        ctx.moveTo(580, 180);
        ctx.lineTo(930, 180);
        ctx.stroke(); 
  
        const dataURL = canvas.toDataURL("image/jpg");
  
        const link = document.createElement("a");
        link.download = fname +"-"+lname + "_business_card.jpg";
        link.href = dataURL;
        const img10 = document.getElementById("preview-image");
        img10.src = link.href;
        link.click();
      };
      imageObj.src = event.target.result;

    };
    
    reader.readAsDataURL(image);
  }
const subdomain = 'demo'; // Replace with your custom subdomain
const frame = document.getElementById('frame');

frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

window.addEventListener('message', subscribe);
document.addEventListener('message', subscribe);

function subscribe(event) {
    const json = parse(event);

    if (json?.source !== 'readyplayerme') {
        return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
        frame.contentWindow.postMessage(
            JSON.stringify({
                target: 'readyplayerme',
                type: 'subscribe',
                eventName: 'v1.**'
            }),
            '*'
        );
    }

    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
        console.log(`Avatar URL: ${json.data.url}`);
        document.getElementById('avatarUrl').innerHTML = `Avatar URL: ${json.data.url}`;
        document.getElementById('frame').hidden = true;
    }

    // Get user id
    if (json.eventName === 'v1.user.set') {
        console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
}

function parse(event) {
    try {
        return JSON.parse(event.data);
    } catch (error) {
        return null;
    }
}

function displayIframe() {
    document.getElementById('frame').hidden = false;
}
