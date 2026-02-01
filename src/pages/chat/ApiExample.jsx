import React, { useState } from "react";
import { searchUsers, addFriend } from "../../api/userApi";

export default function ApiExample() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { users } = await searchUsers(query);
      setResults(users || []);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (id) => {
    try {
      const res = await addFriend(id);
      alert(res.message || "Friend added");
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h3>API Example — Search Users</h3>
      <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="username" />
        <button onClick={handleSearch} disabled={loading}>Search</button>
      </div>
      <div>
        {results.map((u) => (
          <div key={u._id} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
            <div>
              <strong>{u.username}</strong> — {u.fullName}
            </div>
            <button onClick={() => handleAdd(u._id)}>Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}
