import React from 'react';

const onCopyHandler = (text: string) => {
    try {
        navigator.clipboard.writeText(text);
    } catch (e) {
        console.error(e);
    }
};

export default function parseMessage(
    children: React.ReactNode
): React.ReactNode {
    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type == 'code') {
            return React.createElement(
                'code',
                {
                    onClick: () => onCopyHandler(child.props.children),
                    className:
                        'cursor-pointer hover:text-accent-primary !font-ubuntu-mono',
                },
                child.props.children
            );
        }

        if (child.props.children) {
            return React.createElement(child.type, {
                children: parseMessage(child.props.children),
            });
        }
    });
}
