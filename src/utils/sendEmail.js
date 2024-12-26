import nodemalier from 'nodemailer'

const sendEmail=async({from='"Eng Pilot 👻" <abdoelaidy83@gmail.com>',to,subject="Treasure on the journey",html}={}
)=>{
const transporter = nodemalier.createTransport({
service:"gmail",
secure: false, // Use `true` for port 465, `false` for all other ports
auth: {
user: "abdoelaidy83@gmail.com",
pass: process.env.CONFIRMEMAIL_PASS,
},
});
const info = await transporter.sendMail({
from, // sender address
to,
subject, // Subject line
html, // html body
});
}

export default sendEmail