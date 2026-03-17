import { Form, Switch, Card } from "antd"

export const SwitchField = ({ name, label, value, onChange }) => (
  <Form.Item name={name} label={label} valuePropName="checked">
    <Switch checked={value} onChange={onChange} />
  </Form.Item>
)

export const Section = ({ title, children }) => (
  <Card
    size="small"
    title={<span style={{ fontWeight: 600 }}>{title}</span>}
    style={{ marginBottom: 24 }}
  >
    {children}
  </Card>
)