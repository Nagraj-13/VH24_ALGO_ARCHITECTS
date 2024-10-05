import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmailToSuppliers = async (suppliersEmails, items) => {
    try {

        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const message = {
            from: 'donornetofficial@gmail.com',
            to: suppliersEmails.join(", "),
            subject: "New Request for Supplies",
            text: `Hello,
  
            We are in need of the following items:
            ${items.map(item => `${item.name} (Quantity: ${item.quantity ? item.quantity : 'Not specified'})`).join("\n")}
  
            Please let us know if you can provide these items.
  
            Thank you!`,
            html: `
             <b>Hello,</b><br><br>
            We are in need of the following items:<br><ul>
            ${items.map(item => `<li><strong>${item.name}</strong> (Quantity: ${item.quantity ? item.quantity : 'Not specified'})</li>`).join("")}
            </ul><br>
            Please let us know if you can provide these items.<br><br>
            Thank you!
         `
        };
        console.log(items)
        let info = await transporter.sendMail(message);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};