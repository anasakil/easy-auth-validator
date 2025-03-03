Based on the document you shared, here's the complete README.md content for Easy Auth Validator:

# Easy Auth Validator

A lightweight and intuitive library for validating registration and login forms, written in **pure JavaScript**. Compatible with **Node.js**, **React.js**, and **browsers**. No dependencies or compilation required.

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Node.js](#1-with-nodejs)
  - [React.js](#2-with-reactjs)
  - [Browser](#3-in-a-browser)
- [Configuration Options](#configuration-options)
- [Return Structure](#return-structure)
- [Examples](#examples)


---

## Installation

Install the package via npm:

```bash
npm install easy-auth-validator
```

## Features

- Validation for username, email, and password.
- Customizable: Minimum length, strict password rules, allowed email domains.
- Universal Compatibility: Works with Node.js, React, and browsers.
- Performance: Cached regular expressions for efficiency.
- Simplicity: Pure JavaScript, no TypeScript or build steps needed.

## Usage

### 1. With Node.js

#### Basic Example

```javascript
const EasyValidator = require('easy-auth-validator');

const validator = new EasyValidator();
const data = {
    username: 'john',
    email: 'john@example.com',
    password: '123456'
};

const result = validator.register(data);
console.log(result);
```

#### With Custom Options

```javascript
const EasyValidator = require('easy-auth-validator');

const validator = new EasyValidator({
    usernameMin: 5,
    passwordMin: 8,
    strictPassword: true,
    allowedEmails: ['gmail.com', 'outlook.com']
});

const data = {
    username: 'johnny',
    email: 'johnny@gmail.com',
    password: 'Password123!'
};
console.log(validator.register(data));
```

### 2. With React.js

#### Registration Form Example

```jsx
import React, { useState } from 'react';
import EasyValidator from 'easy-auth-validator';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const validator = new EasyValidator({ strictPassword: true, usernameMin: 4 });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validator.register(formData);
        if (!result.valid) {
            setErrors(result.fields);
        } else {
            setErrors({});
            console.log('Registration successful!', formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                {errors.username && !errors.username.valid && (
                    <span style={{ color: 'red' }}>{errors.username.message}</span>
                )}
            </div>
            <div>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && !errors.email.valid && (
                    <span style={{ color: 'red' }}>{errors.email.message}</span>
                )}
            </div>
            <div>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                {errors.password && !errors.password.valid && (
                    <span style={{ color: 'red' }}>{errors.password.message}</span>
                )}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
```

### 3. In a Browser

#### HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Easy Auth Validator Test</title>
</head>
<body>
    <script src="node_modules/easy-auth-validator/src/index.js"></script>
    <script>
        const validator = new EasyValidator();
        const data = {
            email: 'test@example.com',
            password: '123456'
        };
        const result = validator.login(data);
        console.log(result);
    </script>
</body>
</html>
```

## Configuration Options

Pass an options object to the constructor to customize validation rules:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| usernameMin | Number | 3 | Minimum length for the username |
| passwordMin | Number | 6 | Minimum length for the password |
| strictPassword | Boolean | false | Requires a special character and a digit |
| allowedEmails | Array | [] | List of allowed email domains |

Example:

```javascript
const validator = new EasyValidator({
    usernameMin: 4,
    passwordMin: 8,
    strictPassword: true,
    allowedEmails: ['gmail.com']
});
```

## Return Structure

The `register` and `login` methods return an object with:

- `valid`: true if all fields are valid, false otherwise.
- `fields`: An object with validation details for each field:
  - `valid`: true or false.
  - `message`: Error message or 'OK' if valid.

Example Return:

```javascript
{
    valid: false,
    fields: {
        username: { valid: true, message: 'OK' },
        email: { valid: false, message: 'Email is not valid.' },
        password: { valid: true, message: 'OK' }
    }
}
```

## Examples

#### Registration with Error

```javascript
const validator = new EasyValidator({ passwordMin: 8 });
const data = {
    username: 'bob',
    email: 'bob@example.com',
    password: '123' // Too short
};
console.log(validator.register(data));
// {
//   valid: false,
//   fields: {
//     username: { valid: true, message: 'OK' },
//     email: { valid: true, message: 'OK' },
//     password: { valid: false, message: 'Password must be at least 8 characters long.' }
//   }
// }
```

#### Successful Login

```javascript
const validator = new EasyValidator();
const data = {
    email: 'user@example.com',
    password: 'password123'
};
console.log(validator.login(data));
// {
//   valid: true,
//   fields: {
//     email: { valid: true, message: 'OK' },
//     password: { valid: true, message: 'OK' }
//   }
// }
```
