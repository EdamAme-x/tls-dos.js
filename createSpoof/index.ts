import { createUserAgent } from "./../createUserAgent/index.ts";

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function createIP() {
  return `${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${
    randomInt(0, 255)
  }`;
}

const oneParam = () => {
  const key = Math.random().toString(36).substring(2, 15);
  const value = Math.random().toString(36).substring(2, 15);
  return `${key}=${value}; `;
};

export function createCookie() {
  return Array.from({ length: randomInt(1, 10) }, () => oneParam()).join("");
}

export function createSpoof() {
  const ip = createIP();

  return {
    "x-forwarded-for": `${ip}, ${ip}, ${ip}`,
    "x-forwarded-host": ip,
    "x-client-ip": ip,
    "x-real-ip": ip,
    "user-agent": createUserAgent(),
    "cookie": createCookie(),
    "cache-control": "no-cache",
    "pragma": "no-cache",
  };
}
