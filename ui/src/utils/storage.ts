export function get(key: string) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export function set(key: string, value: string) {
  let storeValue;

  // If the key is 'TOKEN', encode the value in base64 format
  if (key === "token") {
    storeValue = btoa(value); // Base64 encode the token
  } else {
    storeValue = value;
  }
  localStorage.setItem(key, JSON.stringify(storeValue));

  // Create a custom event
  const event = new CustomEvent("localStorageChange", {
    detail: {
      key: key,
      value: value,
    },
  });

  // Dispatch the custom event
  window.dispatchEvent(event);
}

export function remove(key: string) {
  localStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}
