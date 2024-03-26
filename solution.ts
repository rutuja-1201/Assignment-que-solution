// Define the interface for user login records
interface UserLoginRecord {
    user_id: string;
    logged_in: Date;
    logged_out: Date | null;
    lastSeenAt: Date;
}

// Extract month and year from a given date
function extractMonthYear(date: Date): string {
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
}

// Calculate monthly logged-in and active users
function calculateMonthlyStats(userRecords: UserLoginRecord[]): void {
    const monthlyActiveUsers: Record<string, Set<string>> = {};
    const monthlyLoggedInUsers: Record<string, Set<string>> = {};

    userRecords.forEach(userRecord => {
        const monthYear = extractMonthYear(userRecord.logged_in);

        // Count logged-in users
        if (monthlyLoggedInUsers[monthYear]) {
            monthlyLoggedInUsers[monthYear].add(userRecord.user_id);
        } else {
            monthlyLoggedInUsers[monthYear] = new Set([userRecord.user_id]);
        }

        // Identify active sessions
        if (!userRecord.logged_out || extractMonthYear(userRecord.logged_out) > monthYear) {
            if (monthlyActiveUsers[monthYear]) {
                monthlyActiveUsers[monthYear].add(userRecord.user_id);
            } else {
                monthlyActiveUsers[monthYear] = new Set([userRecord.user_id]);
            }
        }
    });

    // Output monthly stats
    for (const monthYear in monthlyActiveUsers) {
        console.log(`In ${monthYear}, there were ${monthlyActiveUsers[monthYear].size} active users and ${monthlyLoggedInUsers[monthYear].size} logged-in users.`);
    }
}

// Example usage
const userRecords: UserLoginRecord[] = [
    { user_id: 'user1', logged_in: new Date('2024-01-15'), logged_out: new Date('2024-01-20'), lastSeenAt: new Date('2024-01-20') },
    { user_id: 'user2', logged_in: new Date('2024-01-10'), logged_out: null, lastSeenAt: new Date('2024-01-25') },
    // Add more user records as needed
];

calculateMonthlyStats(userRecords);
