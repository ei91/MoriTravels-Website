<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Load SendGrid's Mail class
require 'vendor/autoload.php';
use SendGrid\Mail\Mail;

// Process the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user input
    $fromName = htmlspecialchars(trim($_POST['fullname']));
    $fromEmail = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $destination = htmlspecialchars(trim($_POST['destination']));
    $resort = htmlspecialchars(trim($_POST['resort']));
    $travelers = htmlspecialchars(trim($_POST['travelers']));
    $budget = htmlspecialchars(trim($_POST['budget']));
    $enquiry = htmlspecialchars(trim($_POST['enquiry']));
    $startDate = htmlspecialchars(trim($_POST['start-date']));
    $endDate = htmlspecialchars(trim($_POST['end-date']));

    // Prepare the email content
    $content = "
    Full Name: $fromName\n
    Email: $fromEmail\n
    Phone: $phone\n
    Destination: $destination\n
    Resort: $resort\n
    Number of Travelers: $travelers\n
    Budget: $budget\n
    Start Date: $startDate\n
    End Date: $endDate\n
    Further Enquiry: $enquiry
    ";

    // Create a new email object and set properties
    $email = new Mail();
    $email->setFrom('emzceo1@gmail.com', 'Mori Travels');
    $email->setSubject("Plan My Trip Submission");
    $email->addTo('mori.idowu@ite.travel', 'Mori Idowu');
    $email->addContent("text/plain", $content);

    // Initialize SendGrid with your API key
    $apiKey = ''; //temporarily  copied out for safety
    $sendgrid = new \SendGrid($apiKey);

    try {
        // Send the email and handle the response
        $response = $sendgrid->send($email);
        if ($response->statusCode() == 202) {
            header("Location: thank_you.html"); // Redirect upon success
            exit();
        } else {
            echo 'Email not sent. Status Code: ' . $response->statusCode();
        }
    } catch (Exception $e) {
        // Handle exceptions
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }

} else {
    echo 'No form data received'; // Handle case where no data is sent
}
?>
