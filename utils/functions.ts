export const removeUndefinedFields = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(item => removeUndefinedFields(item));
    } else if (obj !== null && typeof obj === 'object') {
        // Handle Date objects
        if (obj instanceof Date) {
            return obj;
        }

        const newObj: any = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === undefined) {
                    newObj[key] = '';
                } else if (Array.isArray(obj[key])) {
                    newObj[key] = obj[key].map((item: any) => removeUndefinedFields(item));
                } else if (obj[key] !== null && typeof obj[key] === 'object') {
                    newObj[key] = removeUndefinedFields(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }

        return newObj;
    }

    return obj;
};
