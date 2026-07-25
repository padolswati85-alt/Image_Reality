const API = "https://image-reality.onrender.com";


// ===========================
// FETCH ALL DESTINATIONS
// ===========================
export const fetchDestinations = async () => {

    try {

        const response = await fetch(
            `${API}/destinations/`
        );


        if (!response.ok) {
            throw new Error(
                `API Error ${response.status}`
            );
        }


        const data = await response.json();

        console.log(
            "DESTINATIONS FROM API:",
            data
        );


        return data;


    } catch(error){

        console.error(
            "fetchDestinations Error:",
            error
        );

        return [];

    }

};



// ===========================
// FETCH NEARBY
// ===========================

export const getNearbyDestinations = async(
    lat,
    lon,
    radiusKm=5
)=>{

    try{

        const response = await fetch(
            `${API}/destinations/nearby?lat=${lat}&lon=${lon}&radius_km=${radiusKm}`
        );


        if(!response.ok){
            throw new Error(
                `Nearby API Error ${response.status}`
            );
        }


        return await response.json();


    }catch(error){

        console.error(
            "Nearby Error:",
            error
        );


        return [];

    }

};



// ===========================
// GOOGLE ROUTE
// ===========================

export const showRoute = (
    places,
    setDirections
)=>{


    if(!places || places.length < 2)
        return;



    if(!window.google)
    {
        console.error(
            "Google Maps not loaded"
        );

        return;
    }



    const service =
        new window.google.maps.DirectionsService();



    const request={


        origin:{
            lat:places[0].latitude,
            lng:places[0].longitude
        },


        destination:{
            lat:places[places.length-1].latitude,
            lng:places[places.length-1].longitude
        },


        waypoints:
        places
        .slice(1,-1)
        .map(place=>({
            location:{
                lat:place.latitude,
                lng:place.longitude
            },
            stopover:true
        })),


        travelMode:
        window.google.maps.TravelMode.DRIVING

    };



    service.route(
        request,
        (result,status)=>{


            if(status==="OK")
            {
                setDirections(result);
            }
            else
            {
                console.error(
                    "Route failed:",
                    status
                );
            }

        }
    );


};