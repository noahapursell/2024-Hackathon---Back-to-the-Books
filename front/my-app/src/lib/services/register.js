export default async function Register (firstName,lastName, email, password, phone, canvasToken) {
    const result = await fetch('http://localhost:8080/add-user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password_hash": password,
                "phone_number": phone,
                "canvas_token": canvasToken
            }),
        });
        const status = result.status;
        console.log(status);

        return result;
}