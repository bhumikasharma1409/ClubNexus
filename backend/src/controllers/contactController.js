const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.sendContactEmail = async (req, res) => {
    const { name, email, rollNo, contactNumber, feedback } = req.body;

    if (!name || !email || !rollNo || !contactNumber || !feedback) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address
            replyTo: email,
            to: 'clubnexuschitkara@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Contact Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Roll No:</strong> ${rollNo}</p>
                <p><strong>Contact Number:</strong> ${contactNumber}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${feedback}</p>
            `
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};
