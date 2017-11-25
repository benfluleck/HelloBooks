import moment from 'moment';
import model from '../models';
import { transporter, mailOptions } from '../mailer/mailer';

const { UserBooks, User, Books } = model;

const sendSurcharge = () => (UserBooks.findAll({
  where: {
    returnstatus: false,
    returndate: {
      $lt: Date.now() - 24 * 1000
    }
  },
  include: [
    {
      model: Books,
      as: 'book',
      required: true
    }, {
      model: User

    }

  ]
}).then((overdueBooks) => {
  const bookIds = [];
  const usernames = [];
  const emails = [];
  const bookTitles = [];
  overdueBooks.forEach((book) => {
    bookIds.push(book.book.id);
    usernames.push(book.User.firstname);
    emails.push(book.User.email);
    bookTitles.push(book.book.title);
  });

  emails.forEach((email,index) => {
    const to = email;
    const bcc = null;
    const subject = "Default on Returning Book";
    const html = `
    <p>Hello <strong>${usernames[index]}</strong>, </p>
    <p>This is to notify you that you have exceeded the borrowing duration </p>
    <p>for one of our books you will be be sent a daily fine till you return the book </p>
    <p>Please return the book <strong>${bookTitles[index]}</strong>
    <p>Thank you for the understanding</p><br/>
    <p>Kind regards,</p>`;
    transporter.sendMail(mailOptions(to, bcc, subject, html), function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        process.exit(0);
      }
    })
  });  
})
.catch((error) => { 
  process.stdout.write(error.stack);   
  process.exit(0);
})
);

export default sendSurcharge;
