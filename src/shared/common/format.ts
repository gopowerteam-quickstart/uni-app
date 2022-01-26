export const countFormat = (value: number | string) => {
    if (value === undefined || value === '') {
        return ''
    }

    const count = typeof value === 'string' ? parseInt(value) : value

    const formatValue = Math.round(count / 10000)

    return formatValue > 0.1 ? `${formatValue.toFixed(1)}万` : count
}

export const dateFormat = () => {}
