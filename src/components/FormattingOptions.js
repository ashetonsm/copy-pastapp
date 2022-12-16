export const FormattingOptions = ({ functions }) => {
    return (
        <fieldset>
            <legend>Formatting Options:</legend>
            <div>
                <input
                    type="radio"
                    id="original"
                    name="formattingOption"
                    style={{ marginRight: "0.5rem" }}
                    value={0}
                    defaultChecked
                    onChange={(e) => {
                        functions.setSelectedValue(parseInt(e.currentTarget.value))
                    }} />
                <label htmlFor="original">Original/None</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="addBullets"
                    name="formattingOption"
                    style={{ marginRight: "0.5rem" }}
                    value={1}
                    onChange={(e) => {
                        functions.setSelectedValue(parseInt(e.currentTarget.value))
                    }} />
                <label htmlFor="addBullets">Add Bullets</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="removeBullets"
                    name="formattingOption"
                    style={{ marginRight: "0.5rem" }}
                    value={2}
                    onChange={(e) => {
                        functions.setSelectedValue(parseInt(e.currentTarget.value))
                    }} />
                <label htmlFor="removeBullets">Remove Bullets</label>
            </div>
        </fieldset>
    )
}