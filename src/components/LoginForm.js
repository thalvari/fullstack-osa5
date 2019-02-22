import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({handleSubmit, username, password}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username</label>
                    <input {...username}/>
                </div>
                <div>
                    <label>password</label>
                    <input
                        // type="password"
                        {...password}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
}

export default LoginForm
