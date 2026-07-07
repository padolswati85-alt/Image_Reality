import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function useTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTrips = async () => {
      const q = query(
        collection(db, "trips"),
        where("userId", "==", user.uid)
      );
      const snap = await getDocs(q);

      setTrips(snap.docs.map((d) => d.data()));
    };

    fetchTrips();
  }, [user]);

  return trips;
}
