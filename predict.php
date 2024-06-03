<?php
header('Content-Type: application/json');

// Function to analyze and predict the next sets of numbers
function analyzeAndPredict($sets) {
    $frequency = array_fill(1, 48, 0);

    // Calculate frequency of each number in the 10 sets
    foreach ($sets as $set) {
        foreach ($set as $number) {
            $frequency[$number]++;
        }
    }

    // Generate 3 new sets based on frequency analysis
    $newSets = [];
    for ($i = 0; $i < 3; $i++) {
        arsort($frequency);
        $mostFrequentNumbers = array_keys(array_slice($frequency, 0, 35, true));
        shuffle($mostFrequentNumbers);
        $newSets[] = array_slice($mostFrequentNumbers, 0, 35);
    }

    return $newSets;
}

// Initialize sets array
$sets = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve entered numbers
    for ($i = 0; $i < 10; $i++) {
        $set = [];
        for ($j = 0; $j < 35; $j++) {
            $set[] = $_POST['set' . $i . 'num' . $j];
        }
        $sets[] = $set;
    }

    // Analyze the sets and generate the next 3 sets
    $newSets = analyzeAndPredict($sets);

    // Return results as JSON
    echo json_encode([
        'enteredSets' => $sets,
        'predictedSets' => $newSets
    ]);
}
