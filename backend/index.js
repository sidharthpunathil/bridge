const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");
const verbwire = require('verbwire')('sk_live_f8fbfd33-38b8-422f-b951-7754970618cd');
const app = express();
const FormData = require('form-data');
const axios = require('axios');
const API_KEY = 'sk_live_f8fbfd33-38b8-422f-b951-7754970618cd'

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/data", (req, res) => {
    const { name, description, hostOne, hostTwo, roleOne, roleTwo, address } = req.body;
    console.log(name, description, hostOne, hostTwo, roleOne, roleTwo, address);

    const template = "c3"

    createDoc(template, description, name, hostOne, hostTwo,  roleOne, roleTwo, address)

    // const filePath = `./procecssed/${name}.png`;
    // const img = fs.readFileSync(filePath);
    // res.end(img, 'binary');
    // res.writeHead(200, {'Content-Type': 'image/jpeg' });

    res.send('Data received');
   });

  
async function verbwireNFT(name, address, heading){
try {
  console.log("Minting NFT in address: ", address);

  const form = new FormData();
  form.append("allowPlatformToOperateToken", true);
  form.append("chain", "goerli");
  form.append("recipientAddress", address);
  form.append("filePath", fs.createReadStream(`./processed/${name}.png`));
  form.append("name", name);
  form.append("description", heading);

  const headers = {
    "X-API-Key": API_KEY,
    ...form.getHeaders(),
  };

  console.log(headers)

  const formDataBuffer = await new Promise((resolve, reject) => {
    const formChunks = [];

    form.on("data", (chunk) => formChunks.push(chunk));
    form.on("error", (error) => reject(error));
    form.on("end", () => {
      const formBuffer = Buffer.concat(formChunks);
      resolve(formBuffer);
    });
  });

  const config = {
    method: "post",
    url: "https://api.verbwire.com/v1/nft/mint/quickMintFromFile",
    headers,
    data: form
  };

  console.log("data", form);

  const response = await axios(config);

  console.log(JSON.stringify(response.data));
  res.send(JSON.stringify(response.data));
} catch (err) {
  console.log(err, "error in VM");
}
}


async function mintNFT(name, address, heading) {
  try {
 const sdk = require('api')('@verbwire/v1.0#ius845flgxwog8q');

sdk.auth('sk_live_f8fbfd33-38b8-422f-b951-7754970618cd');
sdk.postNftMintQuickmintfromfile({
  allowPlatformToOperateToken: 'true',
  chain: 'goerli',
  name: name,
  description: heading,
  filePath: `./processed/${name}.png`,
  recipientAddress: address,
}, {accept: 'application/json'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
  } catch (err) {
    console.log('Error minting NFT:', err);
  }
}


function createDoc(
  template,
  heading,
  name,
  hostOne,
  hostTwo,
  roleOne,
  roleTwo,
  address
) {
  // Loading the certificate template
  const canvas = createCanvas(1414, 2000);
  const ctx = canvas.getContext("2d");
  loadImage(`./template/${template}.png`).then((image) => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Setting the font properties
    const fontPath = "./fonts/GildaDisplay-Regular.ttf";
    registerFont(fontPath, { family: "My Font" });
    let fontSize = 42;
    ctx.font = `${fontSize}px 'My Font'`;

    // Drawing the name on the certificate
    const {
      width: headingWidth,
      actualBoundingBoxAscent: headingAscent,
      actualBoundingBoxDescent: headingDescent,
    } = ctx.measureText(heading);
    const headingX = (canvas.width - headingWidth) / 2;
    const headingY = 834 + (82 - headingAscent - headingDescent) / 2;
    ctx.fillText(heading, headingX, headingY);

    fontSize = 92;
    ctx.font = `${fontSize}px 'My Font'`;
    const {
      width: nameWidth,
      actualBoundingBoxAscent: nameAscent,
      actualBoundingBoxDescent: nameDescent,
    } = ctx.measureText(name);
    const nameX = (canvas.width - nameWidth) / 2;
    const nameY = 1180 + (82 - nameAscent - nameDescent) / 2;
    ctx.fillText(name, nameX, nameY);

    // this is the code for extra text (WIP bug with long lines)
    // more things to figure out, better not waste time here ;)

    //   fontSize = 32;
    //   ctx.font = `${fontSize}px 'My Font'`;
    //   const description  = 'This achievement is a reflection of your hard work, dedication and commitment to this field.';
    //   const descriptionWords = description.split(' ');
    //   const maxLineLength = 50;
    //   const lines = [];
    //   let line = '';
    //   for (let i = 0; i < descriptionWords.length; i++) {
    //     const word = descriptionWords[i];
    //     if (line.length + word.length + 1 > maxLineLength) {
    //       lines.push(line);
    //       line = '';
    //     }
    //     if (line !== '') {
    //       line += ' ';
    //     }
    //     line += word;
    //   }
    //   if (line !== '') {
    //     lines.push(line);
    //   }
    //   const line1 = lines[0];
    //   const line2 = lines[1];
    //   const { width: line1Width, actualBoundingBoxAscent: line1Ascent, actualBoundingBoxDescent: line1Descent } = ctx.measureText(line1);
    //   const { width: line2Width, actualBoundingBoxAscent: line2Ascent, actualBoundingBoxDescent: line2Descent } = ctx.measureText(line2);
    //   const line1X = (canvas.width - line1Width) / 3;
    //   const line2X = (canvas.width - line2Width) / 3;
    //   const line1Y  = 1284 + (82 - line1Ascent - line1Descent) / 2;
    //   const line2Y  = line1Y + 42;
    //   ctx.fillText(line1, line1X, line1Y);
    //   ctx.fillText(line2, line2X, line2Y);

    // host one

    fontSize = 54;
    ctx.font = `${fontSize}px 'My Font'`;
    const {
      width: managerWidth,
      actualBoundingBoxAscent: managerAscent,
      actualBoundingBoxDescent: managerDescent,
    } = ctx.measureText(name);
    const managerX = (canvas.width - managerWidth) / 2 - 280;
    const managerY = 1602 + (82 - managerAscent - managerDescent) / 2;
    ctx.fillText(hostOne, managerX, managerY);

    // host two

    fontSize = 54;
    ctx.font = `${fontSize}px 'My Font'`;
    const {
      width: founderWidth,
      actualBoundingBoxAscent: founderAscent,
      actualBoundingBoxDescent: founderDescent,
    } = ctx.measureText(name);
    const founderX = (canvas.width - founderWidth) / 2 + 220;
    const founderY = 1602 + (82 - founderAscent - managerDescent) / 2;
    ctx.fillText(hostTwo, founderX, founderY);

    //role one
    fontSize = 34;
    ctx.font = `${fontSize}px 'My Font'`;
    const {
      width: role_oneW,
      actualBoundingBoxAscent: role_oneA,
      actualBoundingBoxDescent: role_oneD,
    } = ctx.measureText(name);
    const role_oneX = (canvas.width - role_oneW) / 2 + 200;
    const role_oneY = 1652 + (82 - role_oneA - role_oneD) / 2;
    ctx.fillText(roleOne, role_oneX, role_oneY);

    //role two
    fontSize = 34;
    ctx.font = `${fontSize}px 'My Font'`;
    const {
      width: role_two_W,
      actualBoundingBoxAscent: role_twoA,
      actualBoundingBoxDescent: role_twoD,
    } = ctx.measureText(name);
    const role_twoX = (canvas.width - role_two_W) / 2 - 280;
    const role_twoY = 1652 + (82 - role_twoA - role_twoD) / 2;
    ctx.fillText(roleTwo, role_twoX, role_twoY);

    // Saving the image
    const candidate_name = `${name}`;
    const imageName = `${candidate_name}.png`;
    const out = fs.createWriteStream(`./processed/${imageName}`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    try {
    mintNFT(name, address, heading);
    }catch(err) {
      console.log(err, "error in VM")
    }

  });
}

// const template = "c3"
// const heading = "Certificate of Completion of the course on Node.js";
// const name = "Sidharth";
// const hostOne = "Ron Sam";
// const hostTwo = "Xia Kong";
// const roleOne = "Co-founder";
// const roleTwo = "Director";

// createDoc(template, heading, name, hostOne, hostTwo,  roleOne, roleTwo)


app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
