import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import withTransition from './with-transition';

const icons = {
    info: 'announcement',
    success: 'checkmark',
    error: 'remove',
    warning: 'warning circle'
};

function SemanticToast({ type, title, description, onClose, onDismiss, icon, color, ...props }) {
    const computedIcon = icon || icons[type] || 'announcement';
    const computedType = type || (!color && 'info') || undefined;

    const onDispel = e => {
        e.stopPropagation();
        onDismiss();
        onClose();
    };

    return (
        <Message
            onDismiss={onDispel}
            header={title}
            content={description}
            icon={computedIcon}
            color={color}
            floating
            {...props}
        />
    );
}

SemanticToast.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onDismiss: PropTypes.func,
    onClose: PropTypes.func
};

SemanticToast.defaultProps = {
    onDismiss: () => undefined,
    onClose: () => undefined,
    icon: undefined
};

export default withTransition(SemanticToast);
