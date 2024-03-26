type Point = string;
type Trip = Point[];
type Shipment = {
    pickups: Point[];
    dropoffs: Point[];
};

function isValidTrips(shipment: Shipment, trips: Trip[]): boolean {
    const allPoints = [...shipment.pickups, ...shipment.dropoffs];
    const visitedPoints = new Set<Point>();
    let isValid = true;

    for (const trip of trips) {
        const pickUp = trip[0];
        const dropOff = trip[trip.length - 1];
        const viaPoints = trip.slice(1, -1);

        // Check if all pick-up, drop-off, and via points are valid
        if (!shipment.pickups.includes(pickUp) || !shipment.dropoffs.includes(dropOff)) {
            isValid = false;
            break;
        }
        for (const viaPoint of viaPoints) {
            if (!allPoints.includes(viaPoint)) {
                isValid = false;
                break;
            }
        }

        // Check for repeated visits
        for (const point of trip) {
            if (visitedPoints.has(point)) {
                isValid = false;
                break;
            }
            visitedPoints.add(point);
        }
    }

    // Ensure that each trip starts from a pick-up point and ends at a drop-off point
    if (!isValid) return false;

    // Check if all pick-up and drop-off points are visited
    for (const point of shipment.pickups) {
        if (!visitedPoints.has(point)) {
            isValid = false;
            break;
        }
    }

    for (const point of shipment.dropoffs) {
        if (!visitedPoints.has(point)) {
            isValid = false;
            break;
        }
    }

    return isValid;
}


// Example usage:
const shipment: Shipment = {
    pickups: ['A', 'B'],
    dropoffs: ['C', 'D'],
};

const validTrips: Trip[] = [
    ['A', 'W'],
    ['B', 'W'],
    ['W', 'C'],
    ['W', 'D'],
];

const invalidTrips: Trip[] = [
    ['A', 'W1'],
    ['B', 'W2'],
    ['W3', 'C'],
    ['W4', 'D'],
];

console.log('Valid trips:', isValidTrips(shipment, validTrips)); 
console.log('Invalid trips:', isValidTrips(shipment, invalidTrips)); 
