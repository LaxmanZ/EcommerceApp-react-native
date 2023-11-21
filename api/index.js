const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
  .connect(
    'mongodb+srv://laxmanbhajantri:laxmanbb@cluster0.iazkwfu.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error While connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log('Server is running on Port 8080');
});

const User = require('./models/user');
const Order = require('./models/order');

// sending verification mail
const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: 'gmail',
    auth: {
      user: 'yhooyesplease@gmail.com',
      pass: 'svukiuoqwavdiszb',
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: http://192.168.0.101:8080/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already registered:', email); // Debugging statement
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log('New User Registered:', newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        'Registration successful. Please check your email for verification.',
    });
  } catch (error) {
    console.log('Error Registering user', error);
    res.status(500).json({ message: 'Registration Error' });
  }
});

//endpoint to verify the email
app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token' });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Email Verificatioion Failed' });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');

  return secretKey;
};

const secretKey = generateSecretKey();

// endpoint for login to user

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log('Error Login user', error);
    res.status(500).json({ message: 'Login Failed' });
  }
});

//endpoint to store a new address to the backend
app.post('/addresses', async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: 'Address created Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error addding address' });
  }
});

//endpoint to get all the addresses of a particular user
app.get('/addresses/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieveing the addresses' });
  }
});

//endpoint to store all the orders
app.post('/orders', async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    //create an array of Product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    //create a new order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();
    res.status(200).json({ message: 'Order Created Successfully!' });
  } catch (error) {
    console.log('Error While creating orders', error);
    res.status(500).json({ message: 'Error Creating Orders' });
  }
});

//get the user Profile
app.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log('error while getting user Profile', error);
    res.status(500).json({ message: 'Error getting the user profile' });
  }
});

app.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No Orders Found for this User' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.log('Error while getting order', error);
    res.status(500).json({ message: 'Error getting the order' });
  }
});
