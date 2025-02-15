const ContactUs = () => {
    return (
        <div className="py-20 px-6 md:px-16 lg:px-32 text-gray-900">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold text-green-600">Contact Us</h1>
                <p className="text-lg text-gray-700 mt-4">We’d love to hear from you! Reach out to us anytime.</p>
            </div>

            {/* About Section */}
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-semibold text-green-600 mb-4">About Us</h2>
                <p className="text-gray-700 text-lg">
                    We are a passionate team dedicated to providing the best service possible. Our goal is to ensure that our customers
                    receive high-quality support and solutions. Whether you have a question, need assistance, or just want to connect,
                    we are always here for you.
                </p>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-green-600">Address</h2>
                    <p className="mt-2">123 Green Street, City, Country</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-green-600">Email</h2>
                    <p className="mt-2">contact@yourdomain.com</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-green-600">Phone</h2>
                    <p className="mt-2">+123 456 7890</p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-lg shadow-md max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold text-green-600 mb-6">Get In Touch</h2>
                <form className="space-y-6">
                    <input type="text" placeholder="Your Name" className="w-full p-4 border rounded-md" required />
                    <input type="email" placeholder="Your Email" className="w-full p-4 border rounded-md" required />
                    <input type="text" placeholder="Subject" className="w-full p-4 border rounded-md" required />
                    <textarea placeholder="Your Message" className="w-full p-4 border rounded-md h-40" required></textarea>
                    <button className="w-full bg-green-600 text-white py-4 rounded-md text-lg hover:bg-green-700">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;