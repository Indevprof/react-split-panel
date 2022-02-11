import * as React from 'react';
import { render } from 'react-dom';
import { Pane, SplitPanel, useSplitPanel } from '../src';

const SimpleExample = () => {
  const splitPane = useSplitPanel({});
  return (
    <section>
      <pre className="source">
        {`
        const splitpane = useSplitPanel({})

        <SplitPanel  {...splitPane}>
          <Pane initialSize="200px">You can use a Pane component</Pane>
          <div>or you can use a plain old div</div>
          <Pane initialSize="25%" minSize="10%" maxSize="500px">Using a Pane allows you to specify any constraints
            directly</Pane>
        </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane initialSize="200px">You can use a Pane component</Pane>
          <div>or you can use a plain old div</div>
          <Pane initialSize="25%" minSize="10%" maxSize="500px">
            Using a Pane allows you to specify any constraints directly
          </Pane>
        </SplitPanel>
      </div>
    </section>
  );
};

const SimpleNestedExample = () => {
  const verticalSplitPane = useSplitPanel({ split: 'vertical' });
  const horizontalSplitPane = useSplitPanel({ split: 'horizontal' });

  return (
    <section>
      <div>
        <pre className="source">
          {`
            const verticalSplitPane = useSplitPanel({split: 'vertical'});
            const horizontalSplitPane = useSplitPanel({split: 'horizontal'});

            <SplitPanel {...verticalSplitPane}>
            <Pane/>
            <Pane/>
            <SplitPanel {...horizontalSplitPane}>
              <Pane/>
              <Pane/>
              <Pane/>
            </SplitPane>
            <Pane/>
          </SplitPane>
        `}
        </pre>
      </div>
      <div className="example" style={{ height: '100%' }}>
        <SplitPanel {...verticalSplitPane}>
          <Pane minSize="50px">minSize='50px'</Pane>
          <Pane minSize="100px">minSize='100px'</Pane>
          <SplitPanel {...horizontalSplitPane}>
            <Pane minSize="100px">minSize='100px'</Pane>
            <Pane minSize="200px">minSize='200px'</Pane>
            <Pane />
          </SplitPanel>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MultiplePropsNestedExample = () => {
  const verticalSplitPane = useSplitPanel({ split: 'vertical' });
  const horizontalSplitPane = useSplitPanel({ split: 'horizontal' });

  return (
    <section>
      <pre className="source">
        {`
          const verticalSplitPane = useSplitPanel({ split: 'vertical' });
          const horizontalSplitPane = useSplitPanel({ split: 'horizontal' });

          <SplitPanel {...verticalSplitPane}>
            <Pane initialSize="200px" minSize="200px" maxSize="600px">initialSize="200px" minSize="200px" maxSize="600px"</Pane>
            <Pane minSize="20%" maxSize="80%">minSize="20%" maxSize="80%"</Pane>
            <SplitPanel split="horizontal">
              <Pane minSize="10%" maxSize="600px">minSize="10%" maxSize="600px"</Pane>
              <Pane initialSize="50%" minSize="50px" maxSize="80%">initialSize="50%" minSize="50px" maxSize="80%"</Pane>
            </SplitPane>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...verticalSplitPane}>
          <Pane initialSize="200px" minSize="200px" maxSize="600px">
            initialSize="100px" minSize="100px" maxSize="600px"
          </Pane>
          <Pane minSize="20%" maxSize="80%">
            minSize="20%" maxSize="80%"
          </Pane>
          <SplitPanel {...horizontalSplitPane}>
            <Pane minSize="10%" maxSize="600px">
              minSize="10%" maxSize="600px"
            </Pane>
            <Pane initialSize="50%" minSize="50px" maxSize="80%">
              initialSize="50%" minSize="50px" maxSize="80%"
            </Pane>
          </SplitPanel>
        </SplitPanel>
      </div>
    </section>
  );
};

const BasicVerticalExample = () => {
  const splitPane = useSplitPanel({ split: 'vertical' });

  return (
    <section>
      <pre className="source">
        {`
        const splitPane = useSplitPanel({split: 'vertical'});

        <SplitPanel split="vertical">
          <div>This is a div</div>
          <div>This is a div</div>
        </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <div>This is a div</div>
          <div>This is a div</div>
        </SplitPanel>
      </div>
    </section>
  );
};

const BasicHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });

  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({split: 'horizontal'});

          <SplitPanel {...splitPane}>
            <div>This is a div</div>
            <div>This is a div</div>
          </SplitPane>        
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <div>This is a div</div>
          <div>This is a div</div>
        </SplitPanel>
      </div>
    </section>
  );
};

const BasicVerticalPaneExample = () => {
  const splitPane = useSplitPanel({ split: 'vertical' });

  return (
    <section>
      <pre className="source">
        {`
         const splitPane = useSplitPanel({split: 'vertical'});

         <SplitPanel {...splitPane}>
            <Pane>This is a Pane</Pane>
            <Pane>This is a Pane</Pane>
          </SplitPane>        
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane>This is a Pane</Pane>
          <Pane>This is a Pane</Pane>
        </SplitPanel>
      </div>
    </section>
  );
};

const BasicHorizontalPaneExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
        const splitPane = useSplitPanel({ split: 'horizontal' });
        <SplitPanel {...splitPane}>
           <Pane>This is a Pane</Pane>
           <Pane>This is a Pane</Pane>
         </SplitPane>   
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane>This is a Pane</Pane>
          <Pane>This is a Pane</Pane>
        </SplitPanel>
      </div>
    </section>
  );
};

const PanesAndDivsExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({ split: 'horizontal' });
          <SplitPanel {...splitPane}>
            <Pane>This is a Pane</Pane>
            <Pane>This is a Pane</Pane>
          </SplitPane>        
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane>This is a Pane</Pane>
          <div>This is a div</div>
        </SplitPanel>
      </div>
    </section>
  );
};

const InitialPercentageVerticalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
        const splitPane = useSplitPanel({ split: 'horizontal' });
        <SplitPanel {...splitPane}>
          <Pane initialSize="20%">This Pane has initial size of 20%</Pane>
          <Pane/>
        </SplitPane>        
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane initialSize="20%">This Pane has initial size of 20%</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const InitialPercentageHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({ split: 'horizontal' });
          <SplitPanel split="horizontal">
            <Pane/>
            <Pane initialSize="20%">This Pane has initial size of 20%</Pane>
          </SplitPane>      
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane />
          <Pane initialSize="20%">This Pane has initial size of 20%</Pane>
        </SplitPanel>
      </div>
    </section>
  );
};

const InitialPxVerticalExample = () => {
  const splitPane = useSplitPanel({});
  return (
    <section>
      <pre className="source">
        {`
           const splitPane = useSplitPanel({});
            <SplitPanel {...splitPane}>
            <Pane initialSize="200px">This Pane has initial size of 200px</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane initialSize="200px">This Pane has initial size of 200px</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const InitialPxHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });

  return (
    <section>
      <pre className="source">
        {`
          <SplitPanel {...splitPane}>
            <Pane/>
            <Pane initialSize="200px">This Pane has initial size of 200px</Pane>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane />
          <Pane initialSize="200px">This Pane has initial size of 200px</Pane>
        </SplitPanel>
      </div>
    </section>
  );
};

const MinPercentageVerticalExample = () => {
  const splitPane = useSplitPanel({});

  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({});
          <SplitPanel {...splitPane}>
            <Pane minSize="20%">This Pane has a minimum size of 20%</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane minSize="20%">This Pane has a minimum size of 20%</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MinPercentageHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });

  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({split: 'horizontal'});

          <SplitPanel {...splitPane}>
            <Pane minSize="20%">This Pane has a minimum size of 20%</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane minSize="20%">This Pane has a minimum size of 20%</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MinPxVerticalExample = () => {
  const splitPane = useSplitPanel({});
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({});

          <SplitPanel {...splitPane}>
            <Pane minSize="200px">This Pane has a minimum size of 200px</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane minSize="200px">This Pane has a minimum size of 200px</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MinPxHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({ split: 'horizontal' });

          <SplitPanel split="horizontal">
            <Pane minSize="200px">This Pane has a minimum size of 200px</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane minSize="200px">This Pane has a minimum size of 200px</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MaxPercentageVerticalExample = () => {
  const splitPane = useSplitPanel({});

  return (
    <section>
      <pre className="source">
        {`
           const splitPane = useSplitPanel({});
           
           <SplitPanel {...splitPane}>
            <Pane maxSize="20%">This Pane has a maximum size of 20%</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane maxSize="20%">This Pane has a maximum size of 20%</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MaxPercentageHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });

  return (
    <section>
      <pre className="source">
        {`
         const splitPane = useSplitPanel({split: 'horizontal'});

         <SplitPanel  {...splitPane}>
            <Pane maxSize="20%">This Pane has a maximum size of 20%</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane maxSize="20%">This Pane has a maximum size of 20%</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MaxPxVerticalExample = () => {
  const splitPane = useSplitPanel({});

  return (
    <section>
      <pre className="source">
        {`
           <SplitPanel {...splitPane}>
            <Pane maxSize="200px">This Pane has a maximum size of 200px</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane maxSize="200px">This Pane has a maximum size of 200px</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MaxPxHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({split: 'horizontal'});

          <SplitPanel split="horizontal">
            <Pane maxSize="200px">This Pane has a maximum size of 200px</Pane>
            <Pane/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <Pane maxSize="200px">This Pane has a maximum size of 200px</Pane>
          <Pane />
        </SplitPanel>
      </div>
    </section>
  );
};

const MultipleVerticalExample = () => {
  const splitPane = useSplitPanel({});
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({});
          
          <SplitPanel {...splitPane}>
            <div/>
            <div/>
            <div/>
            <div/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <div />
          <div />
          <div />
          <div />
        </SplitPanel>
      </div>
    </section>
  );
};

const MultipleHorizontalExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
          <SplitPanel {...splitPane}>
          <div/>
            <div/>
            <div/>
            <div/>
          </SplitPane>
        `}
      </pre>

      <div className="example">
        <SplitPanel {...splitPane}>
          <div />
          <div />
          <div />
          <div />
        </SplitPanel>
      </div>
    </section>
  );
};

const SubComponentExample = () => {
  const splitPane = useSplitPanel({ split: 'horizontal' });
  return (
    <section>
      <pre className="source">
        {`
          const splitPane = useSplitPanel({ split: 'horizontal' });

          <div className="parent">
            <div className="header">Header</div>
            <div className="wrapper">
              <SplitPanel {...splitPane}>
                <div/>
                <div/>
              </SplitPane>
            </div>
          </div>
        `}
      </pre>

      <div className="example">
        <div className="parent">
          <div className="header">Header</div>
          <div className="wrapper">
            <SplitPanel {...splitPane}>
              <div />
              <div />
            </SplitPanel>
          </div>
        </div>
      </div>
    </section>
  );
};

const examples = {
  SimpleExample,
  SimpleNestedExample,
  MultiplePropsNestedExample,
  SubComponentExample,
  MultipleHorizontalExample,
  MultipleVerticalExample,
  MaxPxHorizontalExample,
  MaxPxVerticalExample,
  MaxPercentageHorizontalExample,
  MaxPercentageVerticalExample,
  MinPxHorizontalExample,
  MinPxVerticalExample,
  MinPercentageHorizontalExample,
  MinPercentageVerticalExample,
  InitialPxHorizontalExample,
  InitialPxVerticalExample,
  InitialPercentageHorizontalExample,
  InitialPercentageVerticalExample,
  BasicHorizontalPaneExample,
  BasicVerticalPaneExample,
  BasicHorizontalExample,
  BasicVerticalExample,
  PanesAndDivsExample,
};

const name = document.location.search.substr(1);
const component = examples[name];
if (component) {
  const wrapper = <React.StrictMode>{component()}</React.StrictMode>;
  render(wrapper, document.getElementById('root'));
}
