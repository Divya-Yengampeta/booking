import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from "rxjs"
import { pluck } from "rxjs/operators"


export interface Country {
  code: String
  name: String
}
export interface ContactDetails {
  address: String
}
export interface Bookings {
  bookingCode: String
  contactDetails: [ContactDetails]
  itinerary: Itinerary
  passengers: Passengers
}

export interface Passengers {
  id: Number
  firstName: String
  lastName: String
  title: TitleData
}
export interface TitleData {
  code: String
  name: String
}
export interface Itinerary {
  type: String
  connections: [Connections]
}

export interface Origin {
  IATACode: String
  name : String
  city : City
}

export interface Destination {
  IATACode: String
  name : String
  city : City
}

export interface City {
  IATACode: String
  name : String
  country : Country
}

export interface Connections {
  id: String
  duration: String
  origin: Origin
  destination: Destination
  segments: String
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private apollo: Apollo) { }

  search(bookingCode: string | null, familyName: string | null): Observable<any> {
    return this.apollo.query({
      query: gql`query myquery($bookingCode: String!,$familyName: String!) {
        getBookings(bookingCode: $bookingCode,familyName : $familyName){
          bookingCode,
    contactDetails {
        address
    },
    
    itinerary {
      type,
      connections {
          id,
          duration,
          origin {
              IATACode,
              name,
              city  {
                  IATACode,
                  name,
                  country  {
                      code,
                      name,
                  }
              }
          },
          destination {
              IATACode,
              name ,
              city {
                  IATACode,
                  name ,
                  country {
                      code,
                      name,
                  }
              }
          },
          segments{
              id,
              type,
              informational,
              departFrom{
                  IATACode,
                  name ,
                  city {
                      IATACode,
                      name ,
                      country{
                          code,
                          name,
                      }
                  }
              },
              arriveOn {
                  IATACode,
                  name ,
                  city {
                      IATACode,
                      name ,
                      country {
                          code,
                          name,
                      }
                  }
              },
              marketingFlight{
                  number,
                  carrier{
                      code,
                      name
                  },
                  status {
                      code,
                      name
                  },
                  numberOfStops,
                  sellingClass{
                      code
                  },
                  operatingFlight{
                      number,
                      carrier {
                          code,
                          name
                      },
                      duration,
                      flown,
                      checkInStart,
                      localCheckInStart,
                      checkInEnd,
                      localCheckInEnd,
                      scheduledArrival,
                      localScheduledArrival,
                      scheduledDeparture,
                      localScheduledDeparture,
                      arrivalTerminal {
                          name,
                      },
                      cabin, {
                          code,
                          name
                      },
                      equipment {
                          code,
                          name
                      }
                  }
              }
          }
      }
  },
    passengers {
      id,
      firstName,
      lastName,
      title {
          code,
          name
      }
  }
        }
      }`,
      variables: {
        bookingCode: bookingCode,
        familyName: familyName
      }
    }).pipe(pluck("data"))
  }
}
