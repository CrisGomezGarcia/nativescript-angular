export class AuthClass {
    validSession(Data: any): any {
        if (Data.data.success) {
            const token = Data.data.fields[0].token;
            return {
                token: token,
                url: '/home',
                sessionApproved: true
            };
        }
        return {
            token: 'undefined',
            url: '/login',
            sessionApproved: false
        };
    }
}
