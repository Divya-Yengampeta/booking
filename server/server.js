var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require( "cors" );
// GraphQL schema
var bookings = require("./assets/mock.json");

var schema = buildSchema(`
    type Query {
        getBookings(bookingCode: String, familyName: String): [Bookings]
    }
    type Bookings {
        bookingCode: String
        contactDetails: [ContactDetails]
        itinerary: Itinerary
        passengers: Passengers
    }
    type ContactDetails {
        address: String
    }
    type Passengers {
        id: Int
        firstName: String
        lastName: String
        title: TitleData
    }
    type TitleData {
        code: String
        name: String
    }
    type Itinerary {
        type: String
        connections: [Connections]
    }

    type Origin {
        IATACode: String
        name : String
        city : City
    }

    type Destination {
        IATACode: String
        name : String
        city : City
    }

    type City {
        IATACode: String
        name : String
        country : Country
    }

    type Country {
        code: String
        name: String
    }

    type Connections {
        id: String
        duration: String
        origin: Origin
        destination: Destination
        segments: [Segments]
    }

    type Segments {
        id: Int
        type: String
        informational: Boolean
        departFrom: Origin
        arriveOn: Origin
        marketingFlight: MarketingFlight
    }

    type MarketingFlight {
        number: String
        carrier: Country
        status: Country
        numberOfStops: Int
        sellingClass: SellingClass
        operatingFlight: OperatingFlight
    }

    type SellingClass {
        code: String
    }

    type OperatingFlight {
        number: String
        carrier: Country
        duration: String
        flown: Boolean
        checkInStart: String
        localCheckInStart: String
        checkInEnd: String
        localCheckInEnd: String
        scheduledArrival: String
        localScheduledArrival: String
        scheduledDeparture: String
        localScheduledDeparture: String
        arrivalTerminal: ArrivalTerminal
        cabin: Country
        equipment: Country
    }

    type ArrivalTerminal {
        name: String
    }

`);

// Root resolver

var root = {
  getBookings: (parent, args, context, info) => {
    if (parent.bookingCode && parent.familyName) {
        if(parent.familyName.indexOf(' ') >= 0){
            let famileArray = parent.familyName.split(' ');
            return bookings.filter(booking => booking.bookingCode === parent.bookingCode && (famileArray.indexOf(booking.passengers.firstName) > -1 || famileArray.indexOf(booking.passengers.lastName) > -1));
        }
        else{
            return bookings.filter(booking => booking.bookingCode === parent.bookingCode && (booking.passengers.firstName.indexOf(parent.familyName) !== -1 || booking.passengers.lastName.indexOf(parent.familyName) !== -1));
        }
    } else {
        return bookings;
    }
  },
};

// Create an express server and a GraphQL endpoint
var app = express();
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
app.use( cors(corsOptions) );
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
