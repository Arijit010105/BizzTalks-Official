// Native fetch (Node 18+)
async function testCORS() {
    console.log('Testing CORS from Origin: http://127.0.0.1:5500');
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://127.0.0.1:5500' // Simulate Live Server
            },
            body: JSON.stringify({
                name: 'CORS Test',
                email: 'test@cors.com',
                message: 'Testing CORS headers'
            })
        });

        console.log('Response Status:', response.status);
        console.log('Access-Control-Allow-Origin:', response.headers.get('access-control-allow-origin'));

        if (response.ok) {
            console.log('CORS Test PASSED');
        } else {
            console.log('CORS Test FAILED');
        }
    } catch (error) {
        console.error('CORS Test ERROR:', error.message);
    }
}

testCORS();
