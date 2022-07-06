import React, { useContext as _useContext } from 'react';

export function createContext<C extends {}>(initialValue?: C) {
    const context = React.createContext<C | undefined>(initialValue);
    const useContext = () => {
        const ctx = _useContext(context);
        if (!ctx) {
            throw new Error('useContext must be inside aProvider with a value');
        }
        return ctx;
    };

    return [useContext, context.Provider] as const;
}
