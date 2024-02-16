export default async function Login (email, password) {
    const result = await fetch('http://localhost:8080/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password_hash": password
            }),
        });

        if(result.status === 200) {
            return true;
        } else {
            return false;
        }

   
}