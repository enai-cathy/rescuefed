"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Request, initialRequests } from "@/lib/data";

interface RequestContextType {
  requests: Request[];
  addRequest: (request: Request) => void;
  updateRequestStatus: (id: number, status: Request["status"]) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("requests");
    if (stored) setRequests(JSON.parse(stored));
    else setRequests(initialRequests);
  }, []);

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  const addRequest = (request: Request) => {
    setRequests((prev) => [...prev, request]);
  };

  const updateRequestStatus = (id: number, status: Request["status"]) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequests must be used within RequestProvider");
  return ctx;
};
