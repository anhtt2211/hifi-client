import { Affix, Col, Drawer, Row } from 'antd';
import AppIcon from 'components/commons/AppIcon';
import LeftNav from 'components/resume-builder/LeftNav';
import Resume from 'components/resume-builder/Resume';
import TemplateSwitch from 'components/resume-builder/TemplateSwitch';
import { DownloadTool } from 'components/resume-builder/widgets';
import ColorTool from 'components/resume-builder/widgets/ColorTool';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import style from './index.module.less';

const ResumeBuilder: NextPage = () => {
  const [isVisibleContent, setIsVisibleContent] = useState<boolean>(false);
  const [isVisibleTemplate, setIsVisibleTemplate] = useState<boolean>(false);
  const componentToPrint = useRef(null);
  return (
    <div style={{ minHeight: '100vh' }} className='py-8'>
      <div className={style.affixContent} onClick={() => setIsVisibleContent(true)}>
        <AppIcon icon='Io5/IoDocumentTextOutline' size='26' />
        <p>My content</p>
      </div>
      <Drawer
        placement='left'
        closable={false}
        onClose={() => setIsVisibleContent(false)}
        visible={isVisibleContent}
        width={550}
        style={{ position: 'absolute' }}
        bodyStyle={{ padding: '8px' }}
      >
        <LeftNav />
      </Drawer>
      <div className={style.affixTemplate} onClick={() => setIsVisibleTemplate(true)}>
        <AppIcon icon='Io5/IoDocumentTextOutline' size='26' />
        <p>Switch template</p>
      </div>
      <Drawer
        placement='left'
        closable={false}
        onClose={() => setIsVisibleTemplate(false)}
        visible={isVisibleTemplate}
        width={220}
        style={{ position: 'absolute' }}
        bodyStyle={{ padding: '8px' }}
      >
        <TemplateSwitch />
      </Drawer>
      <Affix offsetTop={80}>
        <div className={style.affixTool}>
          {/* <FontFamilyTool />
          <FontSizeTool /> */}
          <ColorTool />
          <DownloadTool componentToPrint={componentToPrint} />
        </div>
      </Affix>
      <Row justify='center'>
        <Col>
          <Resume componentToPrint={componentToPrint} />
        </Col>
      </Row>
    </div>
  );
};

export default ResumeBuilder;
