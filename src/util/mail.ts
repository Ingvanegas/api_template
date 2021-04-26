import nodemailer from 'nodemailer';

export class Mail{

    fullName:string = '';
    remitent:string = '';
    receiver:string = '';
    subject:string = '';
    message:string = '';
    file:string = '';

    constructor(fullName:string, remitent:string, receiver:string, subject:string,message:string, file: string){
        this.fullName = fullName;
        this.remitent= remitent;
        this.receiver = receiver;
        this.subject = subject;
        this.message = message;
        this.file = file;
    }

// async..await is not allowed in global scope, must use a wrapper
async sendMail(){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.fwsafetycontrol.com',
      port:2525,
      secureConnection: true,
      tls: {
        rejectUnauthorized:false
      },
      auth: {
        user: 'noreply@fwsafetycontrol.com', // generated ethereal user
        pass: 'Canimafa1' // generated ethereal password
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `'${this.fullName} 🏬' <noreply@fwsafetycontrol.com>`, // sender address
      to: `${this.receiver}`, // list of receivers
      subject: `${this.subject}`, // Subject line
      text: `${this.message}`, // plain text body
      html: `${this.message}`, // html body
      attachments: [
        // Binary Buffer attachment
        {
            filename: 'report.pdf',
            path: this.file,
            contentType: 'application/pdf'
        },
    ],
    });
  
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

  