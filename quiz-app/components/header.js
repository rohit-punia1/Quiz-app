import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState()
  console.log(user)
  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(window.localStorage.getItem("user")))
    }
  }, [])
  const handleLogOutClick = () => {
    window.localStorage.clear()
    router.push("/")
  }
  return (
    <div>
      <header>
        <div className="h-20 w-full bg-slate-100 flex items-center gap-5 p-5">
          <p
            onClick={() => router.push("/dashboard")}
            className="text-base font-semibold cursor-pointer"
          >
            Home
          </p>
          {user && user.role === "admin" &&
            <>
              < p className="text-base font-semibold cursor-pointer" onClick={() => router.push("./quiz-create")}>Quiz</p>
              <p
                className="text-base font-semibold cursor-pointer"
                onClick={() => router.push("/questions")}
              >
                Questions
              </p>
            </>
          }

          <div className="flex flex-row-reverse flex-grow">
            <h1 className="text-base font-semibold cursor-pointer" onClick={handleLogOutClick}>LogOut</h1>
          </div>
        </div>
      </header >
    </div >
  );
};

export default Header;
