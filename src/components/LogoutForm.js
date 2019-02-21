import React from 'react'
import PropTypes from 'prop-types'

const LogoutForm = ({onSubmit}) => (
    <div>
        <form onSubmit={onSubmit}>
            <button type="submit">logout</button>
        </form>
    </div>
)

LogoutForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default LogoutForm
