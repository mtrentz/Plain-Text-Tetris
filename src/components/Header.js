import React from "react";

const Header = () => {
  let plain = `
__________.__         .__        
\\______   \\  | _____  |__| ____  
 |     ___/  | \\__  \\ |  |/    \\ 
 |    |   |  |__/ __ \\|  |   |  \\
 |____|   |____(____  /__|___|  /
                    \\/        \\/ 
`;

  let text = `
___________              __   
\\__    ___/___ ___  ____/  |_ 
  |    |_/ __ \\\\  \\/  /\\   __\\
  |    |\\  ___/ >    <  |  |  
  |____| \\___  >__/\\_ \\ |__|  
             \\/      \\/       
`;

  let tetris = `
___________     __         .__        
\\__    ___/____/  |________|__| ______
  |    |_/ __ \\   __\\_  __ \\  |/  ___/
  |    |\\  ___/|  |  |  | \\/  |\\___ \\ 
  |____| \\___  >__|  |__|  |__/____  >
             \\/                    \\/ 
`;

  return (
    <div className="tracking-tighter md:pr-8">
      <pre className="text-red-600 whitespace-pre-wrap leading-4 tracking-tight -mb-8 md:pr-24">{plain}</pre>
      <pre className="text-emerald-400 whitespace-pre-wrap leading-4 tracking-tight -mb-8">{text}</pre>
      <pre className="text-yellow-600 whitespace-pre-wrap leading-4 tracking-tight mb-4 md:pl-36">{tetris}</pre>
    </div>
  );
};

export default Header;
